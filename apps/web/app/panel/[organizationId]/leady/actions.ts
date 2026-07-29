"use server";

import type { LeadStatus } from "@wyceno/database";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireTenantContext } from "../../../../lib/auth/tenant-context";
import { addLeadNote, changeLeadStatus } from "../../../../lib/leads/service";
import { leadStatuses } from "../../../../lib/leads/presentation";

export type LeadActionState = Readonly<{
  error: string | null;
  success: string | null;
}>;

const idSchema = z.uuid();
const statusSchema = z.enum(leadStatuses as [LeadStatus, ...LeadStatus[]]);

export async function changeLeadStatusAction(
  _previous: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const organizationId = idSchema.safeParse(formData.get("organizationId"));
  const leadId = idSchema.safeParse(formData.get("leadId"));
  const status = statusSchema.safeParse(formData.get("status"));
  if (!organizationId.success || !leadId.success || !status.success) {
    return { error: "Nieprawidłowa zmiana statusu.", success: null };
  }
  try {
    const context = await requireTenantContext(organizationId.data);
    await changeLeadStatus(context, { leadId: leadId.data, status: status.data });
    revalidatePath(`/panel/${organizationId.data}/leady`);
    revalidatePath(`/panel/${organizationId.data}/leady/${leadId.data}`);
    return { error: null, success: "Status został zapisany." };
  } catch {
    return { error: "Nie udało się zmienić statusu.", success: null };
  }
}

export async function addLeadNoteAction(
  _previous: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const organizationId = idSchema.safeParse(formData.get("organizationId"));
  const leadId = idSchema.safeParse(formData.get("leadId"));
  const body = z.string().trim().min(1).max(4000).safeParse(formData.get("body"));
  if (!organizationId.success || !leadId.success || !body.success) {
    return { error: "Notatka musi mieć od 1 do 4000 znaków.", success: null };
  }
  try {
    const context = await requireTenantContext(organizationId.data);
    await addLeadNote(context, { body: body.data, leadId: leadId.data });
    revalidatePath(`/panel/${organizationId.data}/leady/${leadId.data}`);
    return { error: null, success: "Notatka została dodana." };
  } catch {
    return { error: "Nie udało się dodać notatki.", success: null };
  }
}
