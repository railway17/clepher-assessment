interface EmptyResultProps {
  message?: string;
}

const  EmptyResult = ({
  message = "No matches found!",
}: EmptyResultProps) => (
    <span>{message}</span>
  );

export default EmptyResult;
