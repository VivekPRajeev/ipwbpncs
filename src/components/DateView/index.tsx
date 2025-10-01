import { formatTime } from "../../utils/calc";

interface DateViewProps {
  createdAt: Date;
}
export const DateView: React.FC<DateViewProps> = ({ createdAt }) => {
  return <span className="text-sm text-gray-500">{formatTime(createdAt)}</span>;
};
