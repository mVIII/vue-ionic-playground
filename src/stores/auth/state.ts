import { JWT } from '@/types';

interface State {
  token: JWT | null;
}
const STATE: State = {
  token: null,
};

export default STATE;
