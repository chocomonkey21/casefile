"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});
  return (
    <form action={action} className="mt-6 max-w-sm space-y-4">
      <div>
        <label htmlFor="password" className="block font-semibold">
          Editor password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "login-error" : undefined}
          className="mt-1 min-h-11 w-full rounded-[3px] border-2 border-manila-600 bg-paper px-3 text-lg"
        />
      </div>
      {state.error && (
        <p id="login-error" role="alert" className="font-semibold text-evidence-dark">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="min-h-11 rounded-[3px] bg-evidence px-6 font-semibold text-paper hover:bg-evidence-dark disabled:opacity-50"
      >
        {pending ? "Checking" : "Sign in"}
      </button>
    </form>
  );
}
