import { Plan, PlanPreview } from '../types';

export function canViewCollaborators(plan: PlanPreview | Plan) {
  if (!plan.permissions) {
    return false;
  }
  return plan.permissions?.includes('view_collaborator');
}
