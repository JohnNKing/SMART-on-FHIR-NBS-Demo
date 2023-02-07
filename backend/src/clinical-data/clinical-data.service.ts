import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { FhirService } from 'src/fhir/fhir.service';
import { Cache } from 'cache-manager';
import { channel } from 'diagnostics_channel';

@Injectable()
export class ClinicalDataService {
  constructor(
    private readonly fhirService: FhirService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getClinicaData(sessionId: string) {
    // Get clinical data resources from cache
    const cacheMap: any = await this.cacheManager.get(sessionId);
    const patientId = cacheMap.accessTokenRespons.patient;
    const fhirServerUrl = cacheMap.authInit.iss;
    const accessToken = cacheMap.accessTokenRespons.access_token;
    const clinicalResources = cacheMap.appRegistration.clinicalData;
    return this.fhirService.getClinicaData(
      fhirServerUrl,
      accessToken,
      patientId,
      clinicalResources,
    );
  }
}
