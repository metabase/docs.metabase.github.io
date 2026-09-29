export const MODAL_TOP_VAR = "--inkeep-modal-top";

export const MODAL_STYLE = `.ikp-modal__content { margin-top: var(${MODAL_TOP_VAR}, 77px); }`;

export function positionModal(
  topBarId: string,
  doc: Document = document,
): void {
  const top = doc.getElementById(topBarId)?.getBoundingClientRect().top ?? 0;
  doc.body.style.setProperty(MODAL_TOP_VAR, `${Math.max(top, 0)}px`);
}
