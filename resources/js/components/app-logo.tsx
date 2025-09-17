import { cn } from "@/lib/utils";

interface AppLogoProps {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

export function AppLogo({ className, size = "md" }: AppLogoProps) {
    const sizeClasses: Record<NonNullable<AppLogoProps["size"]>, string> = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
    };

    return (
        <div className="flex items-center space-x-2">
            <img
                className={cn(sizeClasses[size], "rounded-full", className)}
                src="https://cdn.dribbble.com/users/16210634/avatars/normal/3887fa4eefec745603aa5a22ff0ececf.png?1684165676"
                alt="App Logo"
            />
        </div>
    );
}
