"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

interface TeamMember {
  id: string;
  memberLogo: string;
  memberName: string;
  memberPost: string;
  memberQuote: string;
}

const TeamSection: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const q = query(collection(db, "team"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const membersArr: TeamMember[] = [];
      querySnapshot.forEach((doc) => {
        membersArr.push({ ...doc.data(), id: doc.id } as TeamMember);
      });
      setTeamMembers(membersArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            A Goal Driven Team
            <span className="block text-[#001114]">
              working together for the better
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Unified by purpose, driven by results – delivering excellence
            through collaborative innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="bg-gray-50/80 border border-gray-200/60 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <CardContent className="p-0 flex flex-col sm:flex-row items-center">
                <div className="p-6 text-left flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {member.memberName}
                  </h3>
                  <p className="text-blue-800 font-medium mb-4">
                    {member.memberPost}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.memberQuote}
                  </p>
                </div>
                <div className="w-full sm:w-2/5 flex-shrink-0">
                  <img
                    src={member.memberLogo}
                    alt={member.memberName}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
