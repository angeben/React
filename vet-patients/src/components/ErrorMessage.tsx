
export default function Error({children} : {children: React.ReactNode}) {
  return (
    <p className="text-red-600 text-sm mt-1">{children}</p>
  )
}
