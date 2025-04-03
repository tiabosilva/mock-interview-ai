"use client"
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";
const AuthFormSchema = (type: FormType) => {

    return z.object({
        name: type === "sign-up" ? z.string().min(3, { message: "Name is required" }) : z.string().optional(),
        email: z.string().email({ message: "Email is required" }),
        password: z.string().min(3, { message: "Password is required" }),
    })
}

const AuthForm = ({type}:{type:FormType}) => {
    const router = useRouter()
    const formSchema = AuthFormSchema(type);

    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
     password: "",	
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        if(type === "sign-up"){
            const {name, email, password} = values;
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const result = await signUp({
                uid : userCredentials.user.uid,
                name: name!,
                email,
                password,
            })
            if(!result.success){
                toast.error(result.message)
                return;
            }
            toast.success("Account created successfully");
            router.push("/sign-in")
        }else{
            const {email, password} = values;
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredentials.user.getIdToken();
            if (!idToken){
                toast.error("sign in failed")
                return;
            }
            await signIn({
                email,
                idToken
            })
            toast.success("Sign in successfull");
            router.push("/")
            
        }

    }catch(error){
        console.log(error)
        toast.error(`Something went wrong : ${error}`)
    }
  }
  const isSignIn = type === "sign-in"
  return (
    <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
                <Image src="./logo.svg" alt="logo" height={32} width={38}/>
                <h2 className="text-primary-100">PrepWise</h2>
                
            </div>
        <h3>practive job interview with ai</h3>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && <FormField 
                control={form.control} 
                name="name" 
                label="Name" 
                placeholder="your name" 
            />
            }
            <FormField 
                control={form.control} 
                name="email" 
                label="Email" 
                placeholder="your email" 
                type="email"
            />
            <FormField 
                control={form.control} 
                name="password" 
                label="Password" 
                placeholder="Enter Your Password"
                type="password" 
            />
            <Button className="btn" type="submit">{isSignIn ? "sign in" : "create an account"}</Button>
        </form>
        </Form>
            <p className="text-center">
                {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
                <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1 ">
                    {!isSignIn ? 'sign in' : 'sign up'}
                </Link>
            </p>
        </div>
    </div>
  )
}

export default AuthForm
 