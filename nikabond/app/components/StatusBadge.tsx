'use client';

const STATUS_COLORS: Record<string, string> = {
    // Session statuses
    draft: 'bg-gray-200 text-gray-700',
    scheduled: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    // Role actor statuses
    shortlisted: 'bg-yellow-100 text-yellow-700',
    callback: 'bg-purple-100 text-purple-700',
    on_hold: 'bg-orange-100 text-orange-700',
    cast: 'bg-lime-200 text-lime-800',
    passed: 'bg-gray-200 text-gray-500',
    // Session actor outcomes
    confirmed: 'bg-blue-200 text-blue-800',
    no_show: 'bg-red-200 text-red-800',
};

const STATUS_LABELS: Record<string, string> = {
    draft: 'Draft',
    scheduled: 'Scheduled',
    completed: 'Completed',
    cancelled: 'Cancelled',
    shortlisted: 'Shortlisted',
    callback: 'Callback',
    on_hold: 'On Hold',
    cast: 'Cast',
    passed: 'Passed',
    confirmed: 'Confirmed',
    no_show: 'No Show',
};

interface StatusBadgeProps {
    status: string;
    className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
    const colors = STATUS_COLORS[status] || 'bg-gray-200 text-gray-600';
    const label = STATUS_LABELS[status] || status;

    return (
        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${colors} ${className}`}>
            {label}
        </span>
    );
};

export default StatusBadge;
