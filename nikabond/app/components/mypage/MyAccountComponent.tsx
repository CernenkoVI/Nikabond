'use client';

import { useCallback, useEffect, useState } from 'react';
import apiService from '@/app/services/apiService';
import Image from 'next/image';
import ActorsPageMiddle from '../actors/ActorsPageMiddle';
import ActorsPageRight from '../actors/ActorsPageRight';
import ActorEditButton from '../actors/ActorEditButton';
import AgentEditButton from '../agents/AgentEditButton';
import useEditCastingDirectorModal from '../hooks/useEditCastingDirectorModal';
import useProfileVersion from '../hooks/useProfileVersion';

// ─── Actor Profile ─────────────────────────────────────────────
const ActorProfileView = ({ profile, onUpdated }: { profile: any; onUpdated: () => void }) => (
    <div className="p-5 mt-1 grid grid-cols-1 lg:grid-cols-[20%_50%_30%] gap-4 shadow-md border border-gray-300 rounded-xl w-full">
        {/* Photo */}
        <div className="border border-lime-300 rounded-xl">
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src={profile.image_url || '/moi.png'}
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt={profile.name}
                />
            </div>
        </div>

        {/* Middle – visible info */}
        <div className="border border-lime-200 shadow-xl rounded-xl">
            <div className="flex items-center justify-between pr-2">
                <h2 className="p-2 text-xl">Visible Information</h2>
                <ActorEditButton actorId={profile.id} actorData={profile} onUpdated={onUpdated} />
            </div>
            <ActorsPageMiddle actor={profile} />
        </div>

        {/* Right – private info */}
        <div className="bg-lime-100 rounded-xl">
            <h2 className="pl-2 py-2 text-xl">Private Information</h2>
            <ActorsPageRight actor={profile} />
        </div>
    </div>
);

// ─── Agent Profile ─────────────────────────────────────────────
const AgentProfileView = ({ profile, onUpdated }: { profile: any; onUpdated: () => void }) => (
    <div className="p-5 mt-1 grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6 shadow-md border border-gray-300 rounded-xl w-full">
        {/* Left card */}
        <div className="flex flex-col items-center p-6 rounded-xl bg-lime-100 border border-lime-300">
            <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4">
                <Image
                    fill
                    src={profile.image_url || '/agent.png'}
                    className="object-cover"
                    alt={profile.name}
                />
            </div>
            <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-semibold">{profile.name}</h2>
                <AgentEditButton agentId={profile.id} agentData={profile} onUpdated={onUpdated} />
            </div>
        </div>

        {/* Right details */}
        <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Agency Details</h2>

            <ProfileField label="Email" value={profile.email} />
            <ProfileField label="Phone" value={profile.phone} />
            <ProfileField label="Description" value={profile.description} />

            {profile.actors && profile.actors.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                    <p className="font-semibold text-gray-700">Managed actors: {profile.actors.length}</p>
                </div>
            )}
        </div>
    </div>
);

// ─── Casting Director Profile ──────────────────────────────────
const CastingDirectorProfileView = ({ profile, user, onUpdated }: { profile: any; user: any; onUpdated: () => void }) => {
    const editModal = useEditCastingDirectorModal();

    return (
        <div className="p-5 mt-1 grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6 shadow-md border border-gray-300 rounded-xl w-full">
            {/* Left card */}
            <div className="flex flex-col items-center p-6 rounded-xl bg-lime-100 border border-lime-300">
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
                    {profile.image_url ? (
                        <Image
                            fill
                            src={profile.image_url}
                            className="object-cover"
                            alt={user.name}
                        />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    )}
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <button
                        onClick={() => editModal.open(profile.id, profile, onUpdated)}
                        className="p-2 rounded-full hover:bg-lime-200 transition cursor-pointer"
                        title="Edit profile"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-lime-600">
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                        </svg>
                    </button>
                </div>
                <span className="text-sm text-gray-500">Casting Director</span>
            </div>

            {/* Right details */}
            <div className="p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">Profile Details</h2>

                <ProfileField label="Email" value={user.email} />
                <ProfileField label="Company" value={profile.company} />
                <ProfileField label="Phone" value={profile.phone} />
                <ProfileField label="Description" value={profile.description} />
            </div>
        </div>
    );
};

// ─── Shared field component ────────────────────────────────────
const ProfileField = ({ label, value }: { label: string; value?: string | null }) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
        <span className="text-sm font-semibold text-gray-600 w-32">{label}</span>
        <span className="text-sm text-gray-800">
            {value || <span className="italic text-gray-400">Not set</span>}
        </span>
    </div>
);

// ─── Main Component ────────────────────────────────────────────
const MyAccountComponent = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const bumpProfileVersion = useProfileVersion((s) => s.bump);

    const fetchProfile = useCallback(() => {
        setLoading(true);
        apiService.get('/api/auth/myprofile/')
            .then((d) => {
                setData(d);
                bumpProfileVersion();
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [bumpProfileVersion]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    if (loading) {
        return <p className="p-4 text-gray-500">Loading profile...</p>;
    }

    if (error || !data) {
        return <p className="p-4 text-red-500">Failed to load profile.</p>;
    }

    const { user, profile } = data;

    if (!profile || Object.keys(profile).length === 0) {
        return <p className="p-4 text-gray-500">No profile found. Please contact support.</p>;
    }

    return (
        <div className="flex flex-col">
            {user.role === 'actor' && <ActorProfileView profile={profile} onUpdated={fetchProfile} />}
            {user.role === 'agent' && <AgentProfileView profile={profile} onUpdated={fetchProfile} />}
            {user.role === 'casting_director' && <CastingDirectorProfileView profile={profile} user={user} onUpdated={fetchProfile} />}
        </div>
    );
};

export default MyAccountComponent;
