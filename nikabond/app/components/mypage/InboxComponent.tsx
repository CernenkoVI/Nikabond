'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Conversation from "../inbox/Conversation";
import ConversationDetail from "../inbox/ConversationDetail";

interface ConversationItem {
    id: number;
    label: string;
    content: string;
}

const mockConversations: ConversationItem[] = [
    { id: 1, label: 'John Doe', content: 'Message history with John Doe' },
    { id: 2, label: 'Jane Smith', content: 'Message history with Jane Smith' },
    { id: 3, label: 'Alice Johnson', content: 'Message history with Alice Johnson' },
];

const InboxComponent = () => {
    const [openIds, setOpenIds] = useState<number[]>([]);

    const toggleConversation = (id: number) => {
        setOpenIds(prev =>
            prev.includes(id)
                ? prev.filter(openId => openId !== id)
                : [...prev, id]
        );
    };

    return (
        <>
            <h1 className="mt-6 mb-2 ml-4 text-xl">Inbox</h1>
            <div className="p-5 my-4 shadow-md border border-gray-300 rounded-xl space-y-4">
                {mockConversations.map(conversation => {
                    const isOpen = openIds.includes(conversation.id);
                    return (
                        <div key={conversation.id} className="space-y-2">
                            <Conversation
                                label={conversation.label}
                                onClick={() => toggleConversation(conversation.id)}
                                isSelected={isOpen}
                            />
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        key="conversation-detail"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <ConversationDetail content={conversation.content} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default InboxComponent;
