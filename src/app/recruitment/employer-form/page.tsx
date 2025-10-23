"use client";

import React from 'react';
import PostJobForm from "@/components/recruitment/PostJobForm";
import PostJobHero from "@/components/recruitment/PostJobHero";

export default function EmployerFormPage() {
    return (
        <>
            <PostJobHero/>
            <div className="min-h-screen bg-gray-50 mt-10">
                <PostJobForm/>
            </div>
        </>
    );
}