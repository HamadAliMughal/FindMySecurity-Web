import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface TwoFAPopupProps {
  onVerify: (code: string) => void;
  code1 :any;
}

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 bg-white text-black rounded-md hover:bg-gray-300 transition ${className}`}
      {...props}
    />
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`text-center text-lg p-3 border rounded-md w-32 mx-auto bg-gray-800 text-white placeholder-gray-400 focus:ring-white ${className}`}
      {...props}
    />
  );
}

export function Dialog({ open, children }: { open: boolean; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent    bg-opacity-50 backdrop-blur-md">
      {children}
    </div>
  );
}

export function DialogContent({ className, children, onClose }: { className?: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className={`relative p-6 text-center bg-black text-white rounded-lg shadow-lg max-w-md mx-auto ${className}`}>
      <button className="absolute top-2 right-2 text-white hover:text-gray-400" onClick={onClose}>
        <X size={20} />
      </button>
      {children}
    </div>
  );
}

export default function TwoFAPopup({ onVerify, code1 }: TwoFAPopupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [code, setCode] = useState("");
  const [success , setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleVerify = () => {
    if (code.length !== 6 || isNaN(Number(code))) {
      setError("Please enter a valid 4-digit code");
      return;
    }
    setError("");
    if(code1 != code){
      setError(`Invalid code ${code1} + ${code}`);
      return;
    }else{
        onVerify(code);
        setSuccess(true);
        setIsOpen(false);
    }

  };

  return (
    <Dialog open={isOpen}>
      <DialogContent onClose={() => onVerify("")}>
        <h2 className="text-xl font-semibold mb-4">Enter 2FA Code</h2>
        <Input 
          type="text" 
          maxLength={6} 
          value={code} 
          onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))} 
          placeholder="••••••"
          aria-label="Enter your 6-digit authentication code"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{'Verified..Please wait for a while'}</p>}
        <Button onClick={handleVerify} className="mt-4 w-full">
          Verify
        </Button>
      </DialogContent>
    </Dialog>
  );
}
