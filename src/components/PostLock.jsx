import React, { useState } from "react";
import PropTypes from "prop-types";
import { Lock } from "lucide-react";
import { unlockPost } from "../lib/lockedPosts";
import { useLanguage } from "../lib/language";

const COPY = {
  en: {
    title: "This post is locked",
    body: "Enter the password to read it.",
    label: "Password",
    submit: "Unlock",
    checking: "Checking...",
    wrong: "That password is not right.",
  },
  ko: {
    title: "잠긴 글입니다",
    body: "비밀번호를 입력하면 읽을 수 있습니다.",
    label: "비밀번호",
    submit: "열기",
    checking: "확인 중...",
    wrong: "비밀번호가 맞지 않습니다.",
  },
};

const PostLock = ({ slug, onUnlock }) => {
  const { language } = useLanguage();
  const text = COPY[language] || COPY.en;

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (checking) return;

    setChecking(true);
    setError("");
    try {
      const bodies = await unlockPost(slug, password);
      if (bodies) {
        onUnlock(bodies);
        return;
      }
      setError(text.wrong);
      setPassword("");
    } catch (cause) {
      setError(cause.message);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div
      lang={language}
      className="rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-10 text-center dark:border-zinc-800 dark:bg-zinc-900"
    >
      <span
        className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
        aria-hidden="true"
      >
        <Lock size={18} />
      </span>

      <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {text.title}
      </h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        {text.body}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-6 flex w-full max-w-xs flex-col gap-2 sm:flex-row"
      >
        <label htmlFor={`unlock-${slug}`} className="sr-only">
          {text.label}
        </label>
        <input
          id={`unlock-${slug}`}
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
          className="flex-1 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500"
          placeholder={text.label}
        />
        <button
          type="submit"
          disabled={checking || password.length === 0}
          // Disabled uses its own solid colors rather than a low opacity, which
          // washed the dark light-mode button out against the panel.
          className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:shadow-none dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
        >
          {checking ? text.checking : text.submit}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

PostLock.propTypes = {
  slug: PropTypes.string.isRequired,
  onUnlock: PropTypes.func.isRequired,
};

export default PostLock;
