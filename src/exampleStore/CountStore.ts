import { supabase } from "../supabase";
import { SupaStore } from "../supamobx/SupaStore";

class CountStore extends SupaStore {
  constructor() {
    super(supabase, "count");
  }

  public updateCount = async (count: number) => {
    this.update({ id: 1, value: count });
  };
}

export const countStore = new CountStore();
