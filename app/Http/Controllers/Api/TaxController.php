<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TaxAccount;
use App\Models\TaxFile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TaxController extends Controller
{
    /**
     * Get all regions with their last update information.
     */
    public function index(): JsonResponse
    {
        try {
            $regions = TaxFile::select('region')
                ->selectRaw('MAX(fetched_at) as last_updated')
                ->selectRaw('COUNT(*) as files_count')
                ->groupBy('region')
                ->orderBy('region')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $regions,
                'message' => 'Regions retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve regions', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve regions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get tax payment details for a specific region.
     */
    public function show(Request $request, string $region): JsonResponse
    {
        try {
            $perPage = $request->get('per_page', 50);
            $perPage = min($perPage, 100); // Limit to 100 items per page

            $query = TaxAccount::forRegion($region)
                ->with('taxFile:id,region,fetched_at')
                ->orderBy('created_at', 'desc');

            // Filter by payment code if provided
            if ($request->has('payment_code')) {
                $query->where('payment_code', 'like', '%' . $request->get('payment_code') . '%');
            }

            // Filter by IBAN if provided
            if ($request->has('iban')) {
                $query->where('iban', 'like', '%' . $request->get('iban') . '%');
            }

            // Filter by receiver if provided
            if ($request->has('receiver')) {
                $query->where('receiver', 'like', '%' . $request->get('receiver') . '%');
            }

            $accounts = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $accounts->items(),
                'pagination' => [
                    'current_page' => $accounts->currentPage(),
                    'last_page' => $accounts->lastPage(),
                    'per_page' => $accounts->perPage(),
                    'total' => $accounts->total(),
                    'from' => $accounts->firstItem(),
                    'to' => $accounts->lastItem(),
                ],
                'message' => "Tax accounts for region '{$region}' retrieved successfully"
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve tax accounts for region', [
                'region' => $region,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => "Failed to retrieve tax accounts for region '{$region}'",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Search tax accounts across all regions.
     */
    public function search(Request $request): JsonResponse
    {
        try {
            $perPage = $request->get('per_page', 50);
            $perPage = min($perPage, 100); // Limit to 100 items per page

            $query = TaxAccount::with('taxFile:id,region,fetched_at')
                ->orderBy('created_at', 'desc');

            // Search by payment code
            if ($request->has('payment_code')) {
                $query->where('payment_code', 'like', '%' . $request->get('payment_code') . '%');
            }

            // Search by IBAN
            if ($request->has('iban')) {
                $query->where('iban', 'like', '%' . $request->get('iban') . '%');
            }

            // Search by receiver
            if ($request->has('receiver')) {
                $query->where('receiver', 'like', '%' . $request->get('receiver') . '%');
            }

            // Search by purpose
            if ($request->has('purpose')) {
                $query->where('purpose', 'like', '%' . $request->get('purpose') . '%');
            }

            // Filter by region
            if ($request->has('region')) {
                $query->forRegion($request->get('region'));
            }

            $accounts = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $accounts->items(),
                'pagination' => [
                    'current_page' => $accounts->currentPage(),
                    'last_page' => $accounts->lastPage(),
                    'per_page' => $accounts->perPage(),
                    'total' => $accounts->total(),
                    'from' => $accounts->firstItem(),
                    'to' => $accounts->lastItem(),
                ],
                'message' => 'Search results retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to search tax accounts', [
                'request' => $request->all(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to search tax accounts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get statistics for tax data.
     */
    public function statistics(): JsonResponse
    {
        try {
            $stats = [
                'total_regions' => TaxFile::distinct('region')->count(),
                'total_files' => TaxFile::count(),
                'total_accounts' => TaxAccount::count(),
                'last_updated' => TaxFile::max('fetched_at'),
                'regions_with_data' => TaxFile::select('region')
                    ->selectRaw('COUNT(*) as files_count')
                    ->selectRaw('MAX(fetched_at) as last_updated')
                    ->groupBy('region')
                    ->orderBy('last_updated', 'desc')
                    ->get()
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Statistics retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve statistics', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
