'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { registerschema, registerschemaform } from '@/schema/register.schema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Register() {

  const router = useRouter()


  // Step 2 categories
  const categories = [
    { id: "events", label: "Campus Events" },
    { id: "sports", label: "Sports" },
    { id: "tech", label: "Technology" },
    { id: "research", label: "Research" },
    { id: "announcements", label: "Announcements" },
    { id: "clubs", label: "Student Clubs" },
  ]

  // State to track which step we're on
  const [step, setStep] = React.useState(1)

  // React Hook Form setup
  const form = useForm<registerschemaform>({
    resolver: zodResolver(registerschema),
    defaultValues: {
      interests: [], // initialize interests for step 2
    }
  })

  // Function to validate Step 1 before moving to Step 2
  const goNext = async () => {
    const isValid = await form.trigger([
      "name",
      "phone",
      "date",
      "email",
      "password",
      "repassword",
      "major"
    ])
    if (isValid) setStep(2)
  }

  // Final submit function
  function onsubmit(data: registerschemaform) {
    console.log("FINAL DATA:", data)

    // after register success → go to login
  router.push('/auth/login')

  }

  return (
    <div className='mt-20'>
      <h2 className='text-green-700 text-2xl text-center mb-6'>Register Now</h2>
      <Form {...form}>
        <form className='w-2/3 mx-auto' onSubmit={form.handleSubmit(onsubmit)}>

          {/* Step 1: Personal info and major */}
          {step === 1 && (
            <>
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='phone'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type='tel' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='date'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Of Birth</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='email'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='password'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' autoComplete='off' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='repassword'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RePassword</FormLabel>
                    <FormControl>
                      <Input type='password' autoComplete='off' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="major"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Major</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your major" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="computer_science">Computer Science</SelectItem>
                          <SelectItem value="information_systems">Information Systems</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="medicine">Medicine</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                className="bg-blue-600 text-white my-5"
                onClick={goNext}
              >
                Next
              </Button>
            </>
          )}

          {/* Step 2: Interests selection */}
          {step === 2 && (
            <>
              <h3 className="text-xl font-semibold mb-4">Choose the news you care about</h3>

              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-4">
                        {categories.map((category) => {
                          const checked = field.value?.includes(category.id)
                          return (
                            <div
                              key={category.id}
                              onClick={() => {
                                if (checked) {
                                  field.onChange(field.value.filter((v) => v !== category.id))
                                } else {
                                  field.onChange([...(field.value || []), category.id])
                                }
                              }}
                              className={`cursor-pointer rounded-xl border p-4 text-center transition
                                ${checked ? "border-blue-600 bg-blue-50" : "border-zinc-300 hover:border-blue-400"}`}
                            >
                              <input type="checkbox" checked={checked} readOnly className="hidden" />
                              <p className="font-medium">{category.label}</p>
                            </div>
                          )
                        })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 mt-8">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button type="submit" className="bg-green-600 text-white">Finish Registration</Button>
              </div>
            </>
          )}

        </form>
      </Form>
    </div>
  )
}

