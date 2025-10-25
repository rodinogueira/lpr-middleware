[Câmeras HIKICENTRAL]
      │
      ▼
  [API Captura de Imagem]
      │
      │ Coloca imagem (VSM) na fila Redis
      ▼
  ┌────────────────────────────┐
  │          Redis Queue       │  ← Fila de trabalho (BLPOP/BRPOP)
  └────────────────────────────┘
      │
      ▼
[Workers de Conversão Base64]  ← Pegam da fila Redis
      │
      │ Atualiza a fila Redis com imagem Base64 pronta
      ▼
[Workers de Consulta Celepar]  ← Consomem da fila Redis
      │
      │ Consulta API Celepar
      │ Recebe resposta
      ▼
┌─────────────────────────────┐
│     Registro em Banco       │  ← EYESEC DB
└─────────────────────────────┘
      │
      ▼
┌─────────────────────────────┐
│ Kafka (Tópicos de Logs)     │  ← Logs persistentes
│ - Horário de captura        │
│ - Tempo de conversão        │
│ - Tempo de resposta Celepar │
│ - Status final do veículo   │
└─────────────────────────────┘
      │
      ▼
[Elasticsearch / Dashboards / Relatórios]  ← Visualização e auditoria
