const H2 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h2 className={`text-xl font-medium ${className}`}>{children}</h2>;
};

export default H2;