const now = new Date();

const scheduleTime = (timeMs: number, exec: () => Promise<any>) => {
  setTimeout(() => {
    exec();
  }, timeMs)
}

const timeSchedule = (expires_in_ms: number, updated_at: Date): number => {
  const expiresInMs = expires_in_ms * 1000;
  const timeElapsed = now.getTime() - updated_at.getTime();
  const timeRemaining = expiresInMs - timeElapsed;
  const scheduleTimeMs = timeRemaining * 0.91; // Agenda para 91% do tempo, executando em 9% restantes

  return scheduleTimeMs
}

const scheduleUtils = {
  scheduleTime,
  timeSchedule
};

export default scheduleUtils;
