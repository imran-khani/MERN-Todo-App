import { Button } from "./Button";

type EmptyStateProps = {
  noData?: boolean;
  setShowForm: (value: boolean) => void;
};

const EmptyState = ({ noData, setShowForm }: EmptyStateProps) => {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-2">
      <img src="/empty.svg" alt="empty" className="w-[200px] h-[200px] md:mr-10" />
      <h1 className="text-heading text-2xl font-bold">No task available</h1>
      <p className="text-subheading text-center">
        Create a new task to get started
      </p>
      {
        noData && (
          <Button 
           onClick={() => setShowForm(true)}
          >
            Create Task
          </Button>
        )
      }
    </div>
  );
};

export default EmptyState;
