import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';
enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    CONNECTING = 'CONNECTING',
    FINISHED = 'FINISHED',
}
const Agent = ({userName} : AgentProps) => {
    const callStatus = CallStatus.FINISHED;
    const isSpeaking = true;
    const messages = [
        'what is your name?',
        'my name is john doe nice to meet you',

    ];
    const LastMessage = messages[messages.length - 1];
  return (
    <>
        <div className='call-view'>
        <div className='card-interviewer'>
            <div className='avatar'>
                <Image
                    src="/ai-avatar.png"
                    alt="vapi"
                    width={65}
                    height={54} 
                    className='object-cover'
                />
                {isSpeaking && <span className='animate-speak'/>}
            </div>
            <h3>AI Interviewer</h3>
        </div>
        <div className='card-border'>
            <div className='card-content'>
                <Image src="/user-avatar.png" 
                alt="user" 
                width={540} 
                height={540} 
                className='rounded-full object-cover size-[120px]'/>
                <h3>
                    {userName}
                </h3>
                
            </div>
        </div>
        </div>
        {messages.length > 0 && (
            <div className='transcript-border'>
                <div className='transcript'>
                    <p key={LastMessage} className={cn('transition-opacity duration-500','animate-fadeIn opacity-100')}>
                        {LastMessage}
                    </p>
                </div>
            </div>
        )
        }

        <div className='w-full flex justify-center'>
            { callStatus !== 'ACTIVE'? (
                <button className='relative btn-call'>
                    <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus!== 'CONNECTING' & 'hidden' )}
                        
                        />
                    <span>
                        {callStatus === 'INACTIVE' || callStatus ==='FINISHED' ? 'Call' : '. . .'}
                    </span>
                 </button>
                 ) : ( <button className='btn-disconnect'>
                    END
                 </button> )}
        </div>
    </>
    )
}

export default Agent
