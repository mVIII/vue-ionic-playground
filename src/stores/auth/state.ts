import { JWT } from '@/types';
console.log("fucked")
interface State {
  token: JWT | null;
}
const STATE: State = {
  token: null,
};

export default STATE;
