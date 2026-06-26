import { describe, it, expect } from 'vitest';
import { ENUMS } from './enums.js';
import { actionLogZodSchema } from '../tools/action-log.js';

describe('ENUMS', () => {
  it('has all expected enum categories', () => {
    const expectedKeys = [
      'osTypes',
      'actionIds',
      'maintenanceTypeIds',
      'approvalRequestStatusIds',
      'updateChannels',
      'elevationStatus',
      'ruleIds',
      'policyActionIds',
      'actionLogGroupBys',
    ];
    expect(Object.keys(ENUMS)).toEqual(expectedKeys);
  });

  it('osTypes maps 1 to Windows', () => {
    expect(ENUMS.osTypes[1]).toBe('Windows');
  });

  it('actionIds maps 1 to Permit', () => {
    expect(ENUMS.actionIds[1]).toBe('Permit');
  });

  it('maintenanceTypeIds maps 3 to Learning', () => {
    expect(ENUMS.maintenanceTypeIds[3]).toBe('Learning');
  });

  it('policyActionIds maps 6 to Permit with Ringfence', () => {
    expect(ENUMS.policyActionIds[6]).toBe('Permit with Ringfence');
  });

  // Regression: value 8 ("Installation Mode (legacy)") is not documented in the KB;
  // legacy installation is value 19 (InstallationLegacy).
  it('maintenanceTypeIds omits the spurious legacy key 8 and keeps 19', () => {
    expect((ENUMS.maintenanceTypeIds as Record<number, string>)[8]).toBeUndefined();
    expect(ENUMS.maintenanceTypeIds[19]).toBe('InstallationLegacy');
  });

  it('osTypes maps 7 to the full Red Hat Enterprise Linux 6 label', () => {
    expect(ENUMS.osTypes[7]).toBe('Red Hat Enterprise Linux 6');
  });

  // Drift guard: the action_log actionId schema must accept every canonical action id
  // so a tool-level enum can't silently drop values (as it did for 3 and 6).
  it('action_log actionId schema accepts every ENUMS.actionIds value', () => {
    for (const key of Object.keys(ENUMS.actionIds)) {
      expect(actionLogZodSchema.actionId.safeParse(Number(key)).success).toBe(true);
    }
  });
});
