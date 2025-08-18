<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventsController extends Controller
{
    /**
     * Display a listing of the user's events.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $events = Event::query()
            ->where('user_id', $user->id)
            ->orderBy('start_date')
            ->paginate(10)
            ->through(function (Event $event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'event_type' => $event->event_type,
                    'start_date' => $event->start_date,
                    'end_date' => $event->end_date,
                    'status' => $event->status,
                ];
            });

        if ($request->wantsJson()) {
            return response()->json($events);
        }

        return Inertia::render('events/index', [
            'events' => $events,
        ]);
    }

    /**
     * Display the specified event (and render same page for drawer UX).
     */
    public function show(Request $request, Event $event)
    {
        // Authorize ownership (basic check)
        abort_unless($event->user_id === $request->user()->id, 404);

        $data = [
            'id' => $event->id,
            'title' => $event->title,
            'event_type' => $event->event_type,
            'description' => $event->description,
            'start_date' => $event->start_date,
            'end_date' => $event->end_date,
            'status' => $event->status,
        ];

        if ($request->wantsJson()) {
            return response()->json($data);
        }

        // Reuse index for listing and pass selected event
        $list = Event::query()
            ->where('user_id', $request->user()->id)
            ->orderBy('start_date')
            ->paginate(10)
            ->through(function (Event $e) {
                return [
                    'id' => $e->id,
                    'title' => $e->title,
                    'event_type' => $e->event_type,
                    'start_date' => $e->start_date,
                    'end_date' => $e->end_date,
                    'status' => $e->status,
                ];
            });

        return Inertia::render('events/index', [
            'events' => $list,
            'selectedEvent' => $data,
        ]);
    }
}


