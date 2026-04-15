const H3 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h3 className={`text-[16px] font-medium ${className}`}>{children}</h3>;
};

export default H3;