"""FIXME: the comment below appears in the output of `alembic history`.
Remove this FIXME and make the comment below easily readable.

${message}
"""
from alembic import op
import sqlalchemy as sa
${imports if imports else ""}

# pre/post deployment: ${config.cmd_opts.head.split("@")[0]}
# revision identifiers, used by Alembic.
revision = ${repr(up_revision)}
down_revision = ${repr(down_revision)}
branch_labels = ${repr(branch_labels)}
depends_on = ${repr(depends_on)}


def upgrade() -> None:
    ${upgrades if upgrades else "pass"}


def downgrade() -> None:
    ${downgrades if downgrades else "pass"}
