'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../components/ui/button'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react' 

const User = ({ isScrolled }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, [status]);

  if (status === 'loading' || isLoading) {
    return (
      <div className={`flex items-center space-x-2 transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0'} ${isScrolled ? 'text-black' : 'text-white'}`}>
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <Button
        onClick={() => router.push('../signup')}
        className={`transition-opacity duration-500 ease-in-out ${showContent ? 'opacity-100' : 'opacity-0'} ${isScrolled ? 'text-white bg-gray-800' : 'text-black bg-white'}  hover:text-white hover:bg-gray-700 transition-colors`}
      >
        Sign Up
      </Button>
    );
  }

  return (
    <div className={`flex items-center space-x-3 transition-opacity duration-500 ease-in-out ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      <div className="h-6 w-px bg-gray-300 mx-2"></div>
      {session.user.image && (
        <div className="relative w-10 h-10">
          <Image 
            src={session.user.image}
            alt="User Profile"
            fill
            className="rounded-full border border-gray-300 object-cover"
            sizes="40px"
            priority
          />
        </div>
      )}
      <Link 
        href={`/user/${session.user.id}`}
        className={`${isScrolled ? 'text-black' : 'text-white'} hover:text-primary transition-colors`}
      >
        <span>{session.user.name}</span>
      </Link>
      <Button 
        onClick={() => signOut()}
        className={`${isScrolled ? 'text-white bg-gray-800' : 'text-black bg-white' } hover:text-white hover:bg-red-700 transition-colors`}
      >
        Sign Out
      </Button>
    </div>
  )
}

export default User

