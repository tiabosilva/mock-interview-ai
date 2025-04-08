import { db } from "@/firebase/admin";


export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
    const interviewsSnapshot = await db.collection("interviews").where("userId", "==", userId).orderBy('createdAt', 'desc').get();
    
    return interviewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Interview[];

}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
    const { userId , limit = 20 } = params;
    
    const interviewsSnapshot = await db.collection("interviews").orderBy('createdAt', 'desc').where("finalized", "==", true).where('userId','!=',userId).limit(limit).get();
    
    return interviewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Interview[];

}

export async function getInterviewByUserId(id: string): Promise<Interview | null> {
    const interview = await db.collection("interviews").doc(id).get();
    
    return interview.data() as Interview | null; 

}