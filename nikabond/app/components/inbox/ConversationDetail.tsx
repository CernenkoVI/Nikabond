'use client';

import SubmitButton from "../SubmitButton";

interface ConversationDetailProps {
    content: string;
}
const ConversationDetail: React.FC<ConversationDetailProps> = ({ content }) => {
    return (
        <div className="p-2 mx-8 md:mx-18 bg-gray-200 rounded-xl">
            <div className="m-1 max-h-[400px] overflow-auto flex flex-col space-y-4">
                <div className="w-[80%] py-2 px-6 rounded-xl bg-gray-100 ">
                    <p>{content}</p>        
                </div>

                <div className="w-[80%] ml-[20%] py-2 px-6 rounded-xl bg-lime-100 ">
                    <p>{content}</p>        
                </div>

                <div className="w-[80%] py-2 px-6 rounded-xl bg-gray-100 ">
                    <p>{content}</p>        
                </div>

                <div className="w-[80%] ml-[20%] py-2 px-6 rounded-xl bg-lime-100 ">
                    <p>{content}</p>        
                </div>

            </div>
            
            <div className="mt-4 py-2 px-6 flex border bg-gray-300  border-gray-400 space-x-4 rounded-xl">
                <input
                    type="text"
                    placeholder=". . ."
                    className="w-full p-2 bg-gray-100 hover:bg-white rounded-xl"
                />

                <SubmitButton
                    label='Send'
                    onClick={() => console.log('Clicked')}
                    className="w-[100px]"
                />
            </div>

        </div>

    )
}

export default ConversationDetail;