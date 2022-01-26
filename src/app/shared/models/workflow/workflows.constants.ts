export const WorkflowsStatus = {
  completed: 'COMPLETED',
  paused: 'PAUSED',
  clerk: 'CLERK',
  invalid: 'INVALID',
  running: 'RUNNING'
};

export const WorkflowsState = {
  processing: 'PROCESSING',
  basic: 'BASIC',
  extended: 'EXTENDED',
  relatedParties: 'RELATED_PARTIES',
  ubo: 'UBO',
  payment: 'PAYMENT',
  childUBO: 'CHILD_UBO',
  invalid: 'INVALID',
  complete: 'COMPLETE'
};

export const WorkflowAction = {
  complete: 'complete',
  copy: 'copy',
  validate: 'validate',
  restart: 'restart',
  refresh: 'refresh',
  pause: 'pause',
  resume: 'resume'
};

export const ActionMessages = {
  complete: 'setting workflow as completed',
  copy: 'copying workflow',
  validate: 'sending workflow to validation',
  restart: 'restarting workflow',
  refresh: 'while refreshing workflow',
  pause: 'pausing workflow',
  resume: 'resuming workflow'
};
