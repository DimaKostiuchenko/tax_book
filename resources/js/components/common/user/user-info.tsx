import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { IconUser } from '@/components/common/icons/icon-user';
import { type User } from '@/types';

export function UserInfo({ user, showEmail = false }: { user: User; showEmail?: boolean }) {
    const getInitials = useInitials();

    return (
        <>
            <IconUser/>

            <div className="grid flex-1 text-left text-base leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && <span className="truncate text-xs text-muted-foreground">{user.email}</span>}
            </div>
        </>
    );
}
