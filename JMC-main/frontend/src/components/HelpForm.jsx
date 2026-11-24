import { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// "How can we help you?" field: sends the text to the contact form as ?message=.
export const HelpForm = ({ tone = 'light', className = '', onSubmitted }) => {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const id = useId();
  const dark = tone === 'dark';

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = text.trim();
    navigate(message ? `/contact?message=${encodeURIComponent(message)}` : '/contact');
    setText('');
    onSubmitted?.();
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <label htmlFor={id} className="sr-only">
        How can we help you?
      </label>
      <div className={`flex items-center border-b ${dark ? 'border-white/40' : 'border-ink'}`}>
        <input
          id={id}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How can we help you?"
          autoComplete="off"
          className={`w-full min-w-0 bg-transparent py-2 pr-2 outline-none focus-visible:outline-none ${
            dark ? 'text-base text-white placeholder:text-white/55' : 'text-[14px] text-ink placeholder:text-subtle'
          }`}
        />
        <button
          type="submit"
          aria-label="Continue to the contact form"
          className={`flex h-9 w-9 flex-none items-center justify-end transition-colors focus-visible:outline-none ${
            dark ? 'text-white hover:text-white/70' : 'text-accent hover:text-ink'
          }`}
        >
          <ArrowRight size={18} strokeWidth={1.25} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};
