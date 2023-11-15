import { supabase } from "../supabase";
import { SupabaseStore } from "./SupaStore";

// export const countStore = new SupabaseStore(supabase, "count");
class CountStore extends SupabaseStore {
  constructor() {
    super(supabase, "count");
  }

  public updateCount = async (count: number) => {
    this.update({ id: 1, value: count });
  };
}

export const countStore = new CountStore();
