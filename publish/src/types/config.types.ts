export interface FirebaseConfig {
  type: string;
  projectId: string;
  privateKeyId: string;
  privateKey: string;
  clientEmail: string;
  clientId: string;
  authUri: string;
  tokenUri: string;
  authProviderCertUrl: string;
  clientCertUrl: string;
}

export interface MeiliSearchConfig {
  host: string;
  apiKey: string;
}

export interface AppConfig {
  firebase: FirebaseConfig;
  meilisearch: MeiliSearchConfig;
  projectsDir: string;
}
