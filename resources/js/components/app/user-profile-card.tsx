import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BadgePill } from './badge-pill';
import { Shield, PencilLine } from 'lucide-react';
import { motion } from 'framer-motion';
import { type User } from '@/types/dashboard';

export interface UserProfileCardProps {
  user: User;
  onEdit?: () => void;
}

const UserProfileCard = React.forwardRef<HTMLDivElement, UserProfileCardProps>(
  ({ user, onEdit, ...props }, ref) => {
    return (
      <Card ref={ref} {...props}>
        <CardContent className="p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <motion.h1 
                initial={{ opacity: 0, y: 6 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.35 }} 
                className="text-xl md:text-2xl font-semibold"
              >
                👋 Вітаємо, {user.name}!
              </motion.h1>
              <p className="text-sm text-muted-foreground">
                Ваші податкові налаштування актуальні станом на {user.profile.updatedAt}.
              </p>
              <div className="flex flex-wrap gap-2 pt-2" role="group" aria-label="User profile badges">
                <BadgePill tone="success">{user.profile.type}</BadgePill>
                <BadgePill tone="success">{user.profile.group}</BadgePill>
                <BadgePill>{user.profile.system}</BadgePill>
                <BadgePill>ЄДРПОУ/ІПН: {user.profile.edrpou}</BadgePill>
                <BadgePill tone={user.profile.vat ? "success" : "warn"}>
                  {user.profile.vat ? "З ПДВ" : "Без ПДВ"}
                </BadgePill>
                <BadgePill>Звітність: {user.profile.period}</BadgePill>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <div className="w-44">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Профіль заповнено</span>
                    <span aria-live="polite">{user.profile.completeness}%</span>
                  </div>
                  <Progress 
                    value={user.profile.completeness} 
                    className="h-2"
                    aria-label={`Profile completeness: ${user.profile.completeness}%`}
                  />
                  <div className="flex justify-end mt-2">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      onClick={onEdit}
                      aria-label="Edit user profile"
                    >
                      <PencilLine className="h-4 w-4 mr-1" aria-hidden="true" />
                      Редагувати
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

UserProfileCard.displayName = 'UserProfileCard';

export { UserProfileCard };
