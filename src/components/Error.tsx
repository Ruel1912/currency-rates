interface Props {
  error: string
}
const Error = ({ error }: Props) => {
  return (
    <div className="toast toast-end">
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    </div>
  )
}

export default Error
