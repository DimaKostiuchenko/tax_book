import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BadgePill } from '../components/badge-pill';
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
      <Card ref={ref} className="pt-0 pb-0 bg-white rounded-none
      border-0 shadow-none overflow-hidden" {...props}>
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-[#344CB7] to-[#4A5BC7] p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">👋</span>
                </div>
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-2xl font-semibold text-white"
                  >
                    Вітаємо, {user.name}!
                  </motion.h1>
                  <p className="text-white mt-1">
                    Ваші податкові налаштування актуальні станом на {user.profile.updatedAt}
                  </p>
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
