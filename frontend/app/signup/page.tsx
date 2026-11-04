"use client";

import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    emailId: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Signup data:", formData);
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <main className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-900">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Sign up
        </h1>
        <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
          Create your account to get started.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="h-11 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-black outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="h-11 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-black outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="mobileNumber"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Mobile number
            </label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              required
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="h-11 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-black outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="emailId"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email ID
            </label>
            <input
              id="emailId"
              name="emailId"
              type="email"
              required
              value={formData.emailId}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              className="h-11 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-black outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="h-11 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-black outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            Sign up
          </button>
        </form>
      </main>
    </div>
  );
}
