import { describe, it, expect, vi, beforeEach } from 'vitest';
import { z } from 'zod';
import { handleThreatLockerVersionsTool, threatlockerVersionsZodSchema, threatlockerVersionsTool } from './threatlocker-versions.js';
import { ThreatLockerClient } from '../client.js';

vi.mock('../client.js');

describe('versions tool', () => {
  let mockClient: ThreatLockerClient;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
    } as unknown as ThreatLockerClient;
  });

  it('has correct schema', () => {
    expect(threatlockerVersionsTool.name).toBe('versions');
    expect(threatlockerVersionsZodSchema.action.options).toContain('list');
  });

  it('returns error for missing action', async () => {
    const result = await handleThreatLockerVersionsTool(mockClient, {});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe('BAD_REQUEST');
    }
  });

  it('calls correct endpoint for list action', async () => {
    vi.mocked(mockClient.get).mockResolvedValue({ success: true, data: [] });
    await handleThreatLockerVersionsTool(mockClient, { action: 'list' });
    expect(mockClient.get).toHaveBeenCalledWith(
      'ThreatLockerVersion/ThreatLockerVersionGetForDropdownList',
      {}
    );
  });

  // Regression: the output schema must accept the real API row shape. The live
  // response uses `osType` (lowercase), not `OSTypes` — validating against OSTypes
  // crashed the whole tool with an output-validation error.
  it('output schema accepts a real version row (osType, not OSTypes)', () => {
    const schema = z.object(threatlockerVersionsTool.outputZodSchema as Record<string, z.ZodTypeAny>);
    const realResponse = {
      success: true,
      data: [{
        label: '11.0.21 (Beta)',
        value: 'ec673e05-d3a5-4b76-9145-45e51ce51058',
        isEnabled: true,
        dateTime: '2026-06-16T14:01:24Z',
        osType: 1,
        mainVersion: 11,
        url: '11.0.21',
        isDefault: false,
      }],
    };
    expect(schema.safeParse(realResponse).success).toBe(true);
  });

  it('returns error for unknown action', async () => {
    const result = await handleThreatLockerVersionsTool(mockClient, { action: 'delete' as any });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe('BAD_REQUEST');
      expect(result.error.message).toContain('Unknown action');
    }
  });
});
