import React from 'react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'
const page = () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-8 max-w-lg'>
          <h2>Get Interview Ready with AI-powered practice & feedback</h2>
          <p className='text-lg'>
            practice on real interview questions, get AI-generated feedback, and ace your next interview.
          </p>
          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href="/interview"> Start an interview</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="robot-dude" width={400} height={400} className='max-sm:hidden'></Image>
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>your interview</h2>
        <div className='interviews-section'>
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id}/>
          ))}
          
        </div>
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2> take an interview </h2>
        <div className='interviews-section'>
          {dummyInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id}/>
            ))}
        </div>
      </section>

    </>
  )
}

export default page
