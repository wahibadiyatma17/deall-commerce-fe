import { useFormContext } from 'react-hook-form';
import 'twin.macro';

// Referenced from https://react-hook-form.com/advanced-usage#ConnectForm
export const ConnectForm = ({ children }: { children: any }) => {
  const methods = useFormContext();
  return children({ ...methods });
};
