import { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Icon } from './Icons';

interface ToastItem {
  id: number;
  message: string;
}

type PushToast = (message: string) => void;

const ToastContext = createContext<PushToast>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const push = useCallback<PushToast>((message) => {
    const id = ++nextId.current;
    setItems((list) => [...list, { id, message }]);
    window.setTimeout(() => {
      setItems((list) => list.filter((item) => item.id !== id));
    }, 3400);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="toast-viewport" aria-live="polite">
        {items.map((item) => (
          <div className="toast" key={item.id} role="status">
            <span className="toast-icon">
              <Icon name="check" size={13} />
            </span>
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
