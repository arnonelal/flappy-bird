import { HandlerHolder } from "utils/HandlerHolder";
import { useConst } from "./useConst";

export function useHandlerHolder<Args extends any[]>(): HandlerHolder<Args> {
  const handlerHolder = useConst(() => new HandlerHolder<Args>());
  return handlerHolder;
}