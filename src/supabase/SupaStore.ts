import { action, makeObservable, observable } from "mobx";
import { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseStore {
  public rows: any[] = [];
  private table: string = "";
  private supabase: SupabaseClient<any, "public", any>;

  constructor(supabase: SupabaseClient<any, "public", any>, table: string) {
    this.table = table;
    this.supabase = supabase;
    this.getInitialData();
    supabase
      .channel(`public:${table}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table },
        (p) => this.onUpdate(p)
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table },
        (p) => this.onUpdate(p)
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table },
        (p) => this.onDelete(p)
      )
      .subscribe();
    // makeAutoObservable(this);
    makeObservable(this, {
      rows: observable,
      create: action,
      update: action,
    });
  }

  private getInitialData = async () => {
    const { data } = await this.supabase.from(this.table).select("*");
    this.rows = data || [];
  };

  create = async (data: any) => {
    const { data: row, error } = await this.supabase
      .from(this.table)
      .insert(data);
    if (error) {
      console.error(error);
    } else {
      this.rows.push(row);
    }
  };

  update = async (data: any) => {
    const updatedIndex = this.rows.findIndex((p) => p.id === data.id);
    this.rows[updatedIndex] = data;

    const { error } = await this.supabase
      .from(this.table)
      .update(data)
      .match({ id: data.id })
      .select("*");

    if (error) {
      console.error(error);
    }
  };

  onUpdate = (payload: any) => {
    const updatedIndex = this.rows.findIndex((p) => p.id === payload.new.id);
    this.rows[updatedIndex] = payload.new;
  };

  onDelete = (p: any) => {
    console.log("onDelete", p);
  };
}
