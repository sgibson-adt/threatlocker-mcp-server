export const ENUMS = {
  osTypes: {
    0: 'All (filter only — not a real device OS)',
    1: 'Windows',
    2: 'macOS',
    3: 'Linux',
    5: 'Windows XP',
    7: 'Red Hat Enterprise Linux 6',
  },
  actionIds: {
    1: 'Permit',
    2: 'Deny',
    3: 'Deny (Option to Request)',
    6: 'Ringfenced',
    99: 'Any Deny',
  },
  maintenanceTypeIds: {
    1: 'ApplicationControlMonitorOnly',
    2: 'ApplicationControlInstallationMode',
    3: 'Learning',
    4: 'Elevation',
    6: 'TamperProtectionDisabled',
    14: 'Isolation',
    15: 'Lockdown',
    16: 'DisableOpsAlerts',
    17: 'NetworkControlMonitorOnly',
    18: 'StorageControlMonitorOnly',
    19: 'InstallationLegacy',
  },
  approvalRequestStatusIds: {
    1: 'Pending',
    4: 'Approved',
    6: 'Not Learned',
    10: 'Ignored',
    12: 'Added to Application',
    13: 'Escalated from Cyber Heroes',
    16: 'Self-Approved',
  },
  // NOTE: updateChannels integer codes (0-4) are sourced only from the legacy
  // CLAUDE.md reference; the KB lists channel names but not their numeric codes.
  // Treat as unverified until confirmed against portal traffic.
  updateChannels: {
    0: 'Manual',
    1: 'Pre-Releases',
    2: 'Regular',
    3: 'Expedited',
    4: 'Slow and Steady',
  },
  elevationStatus: {
    0: 'Do not Elevate / None',
    1: 'Elevate (Notify User)',
    2: 'Elevate (Do Not Notify User)',
    3: 'Force Standard User',
  },
  // NOTE: ruleIds values are not documented in the KB/swagger; unverified.
  ruleIds: {
    0: 'No Maintenance Mode',
    1: 'Installation Mode (1 hour)',
    2: 'Learning Mode (1 hour)',
    3: 'Monitor Mode (1 hour)',
  },
  policyActionIds: {
    1: 'Permit',
    2: 'Deny',
    6: 'Permit with Ringfence',
  },
  actionLogGroupBys: {
    1: 'Username',
    2: 'Process Path',
    6: 'Policy Name',
    8: 'Application Name',
    9: 'Action Type',
    17: 'Asset Name',
    70: 'Risk Score',
  },
} as const;
