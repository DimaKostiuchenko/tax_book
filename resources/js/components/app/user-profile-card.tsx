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
      <Card ref={ref} className="pt-0 pb-0 bg-white rounded-none
      border-0 shadow-none overflow-hidden" {...props}>
        <CardContent className="p-0">
          {/* Header Section with Gradient Background */}
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
              {/* <Button
                size="icon"
                className="bg-white text-gray-900 rounded-full p-4
                hover:bg-white/2 backdrop-blur-sm"
                onClick={onEdit}
                aria-label="Edit user profile"
              >
                <PencilLine className="h-4 w-4" aria-hidden="true" />

              </Button> */}
            </div>
          </div>

          {/* Content Section */}

            {/* Profile Badges */}
            {/*<div className="p-6">*/}

            {/*  <div className="flex flex-wrap gap-2" role="group" aria-label="User profile badges">*/}
            {/*    <BadgePill tone="success">{user.profile.type}</BadgePill>*/}
            {/*    <BadgePill tone="success">{user.profile.group}</BadgePill>*/}
            {/*    <BadgePill>{user.profile.system}</BadgePill>*/}
            {/*    <BadgePill>ІПН: {user.profile.edrpou}</BadgePill>*/}
            {/*    <BadgePill tone={user.profile.vat ? "success" : "warn"}>*/}
            {/*      {user.profile.vat ? "З ПДВ" : "Без ПДВ"}*/}
            {/*    </BadgePill>*/}
            {/*    <BadgePill>Звітність: {user.profile.period}</BadgePill>*/}
            {/*  </div>*/}
            {/*</div>*/}



        </CardContent>
      </Card>
    );
  }
);

UserProfileCard.displayName = 'UserProfileCard';

export { UserProfileCard };
