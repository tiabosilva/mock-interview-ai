import React from 'react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import InterviewCard from '@/components/InterviewCard'
import {getLatestInterviews} from '@/lib/actions/general.action'
import {getInterviewsByUserId} from '@/lib/actions/general.action'
import {getCurrentUser} from '@/lib/actions/auth.action'
const page = async () => {
  const user = await getCurrentUser()
  
  const [userInterviews,latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({userId: user?.id!})
  ])
  
 

  const hasPastInterviews = userInterviews.length > 0;
  const hasUpcomingInterviews = latestInterviews.length > 0;
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
          {
              hasPastInterviews ? (
                userInterviews?.map((interview)=> (
                  <InterviewCard {...interview} key={interview.id}/>

                ))) : (
                  <p>you did not take any interviews yet</p>
                )
              
          }
          
        </div>
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2> take an interview </h2>
        <div className='interviews-section'>
        {
              hasUpcomingInterviews ? (
                latestInterviews?.map((interview)=> (
                  <InterviewCard {...interview} key={interview.id}/>

                ))) : (
                  <p>There are no new interviews available</p>
                )
              
          }
        </div>
      </section>

    </>
  )
}

export default page
