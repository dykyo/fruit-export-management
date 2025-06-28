import { createClient } from '@/lib/supabase-client'
import { Shipper, Consignee, NotifyParty, ShipperFormData, ConsigneeFormData, NotifyPartyFormData } from '@/types/database'

const supabase = createClient()

// Shipper API Functions
export const shipperApi = {
  // Get all shippers
  async getAll(): Promise<{ data: Shipper[] | null; error: any }> {
    const { data, error } = await supabase
      .from('shippers')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Get shipper by ID
  async getById(id: string): Promise<{ data: Shipper | null; error: any }> {
    const { data, error } = await supabase
      .from('shippers')
      .select('*')
      .eq('id', id)
      .single()
    
    return { data, error }
  },

  // Create new shipper
  async create(shipperData: ShipperFormData): Promise<{ data: Shipper | null; error: any }> {
    const { data, error } = await supabase
      .from('shippers')
      .insert([shipperData])
      .select()
      .single()
    
    return { data, error }
  },

  // Update shipper
  async update(id: string, shipperData: Partial<ShipperFormData>): Promise<{ data: Shipper | null; error: any }> {
    const { data, error } = await supabase
      .from('shippers')
      .update(shipperData)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  // Delete shipper
  async delete(id: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('shippers')
      .delete()
      .eq('id', id)
    
    return { error }
  }
}

// Consignee API Functions
export const consigneeApi = {
  // Get all consignees
  async getAll(): Promise<{ data: Consignee[] | null; error: any }> {
    const { data, error } = await supabase
      .from('consignees')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Get consignee by ID
  async getById(id: string): Promise<{ data: Consignee | null; error: any }> {
    const { data, error } = await supabase
      .from('consignees')
      .select('*')
      .eq('id', id)
      .single()
    
    return { data, error }
  },

  // Create new consignee
  async create(consigneeData: ConsigneeFormData): Promise<{ data: Consignee | null; error: any }> {
    const { data, error } = await supabase
      .from('consignees')
      .insert([consigneeData])
      .select()
      .single()
    
    return { data, error }
  },

  // Update consignee
  async update(id: string, consigneeData: Partial<ConsigneeFormData>): Promise<{ data: Consignee | null; error: any }> {
    const { data, error } = await supabase
      .from('consignees')
      .update(consigneeData)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  // Delete consignee
  async delete(id: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('consignees')
      .delete()
      .eq('id', id)
    
    return { error }
  }
}

// Notify Party API Functions
export const notifyPartyApi = {
  // Get all notify parties
  async getAll(): Promise<{ data: NotifyParty[] | null; error: any }> {
    const { data, error } = await supabase
      .from('notify_parties')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Get notify party by ID
  async getById(id: string): Promise<{ data: NotifyParty | null; error: any }> {
    const { data, error } = await supabase
      .from('notify_parties')
      .select('*')
      .eq('id', id)
      .single()
    
    return { data, error }
  },

  // Create new notify party
  async create(notifyPartyData: NotifyPartyFormData): Promise<{ data: NotifyParty | null; error: any }> {
    const { data, error } = await supabase
      .from('notify_parties')
      .insert([notifyPartyData])
      .select()
      .single()
    
    return { data, error }
  },

  // Update notify party
  async update(id: string, notifyPartyData: Partial<NotifyPartyFormData>): Promise<{ data: NotifyParty | null; error: any }> {
    const { data, error } = await supabase
      .from('notify_parties')
      .update(notifyPartyData)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  // Delete notify party
  async delete(id: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('notify_parties')
      .delete()
      .eq('id', id)
    
    return { error }
  }
}
