import {
  Interaction,
  MessageComponentInteraction,
  AutocompleteInteraction,
  ComponentType,
  ButtonStyle,
  TextInputStyle,
  InteractionReplyOptions,
} from "discord.js";

const emoji = {
  left: "⬅️",
  right: "➡️",
  page: "📑",
  delete: "❌",
};

export class embedPaginator {
  declare filter: (i: MessageComponentInteraction) => boolean;
  declare handler: EmbedHandler;
  private declare ephemeral: boolean;

  constructor(
    interaction: Exclude<Interaction, AutocompleteInteraction>,
    embeds: EmbedHandler["embeds"],
    options?: embedPaginationOptions
  ) {
    this.handler = new EmbedHandler(embeds);
    this.filter = (i) => i.user.id == interaction.user.id;
    this.ephemeral = options?.ephemeral ?? false;
    this.init(interaction);
  }

  async init(interaction: Exclude<Interaction, AutocompleteInteraction>) {
    const message = await interaction.reply({
      ephemeral: this.ephemeral,
      embeds: [this.handler.value],
      components: this.components(),
      fetchReply: true,
    });

    const collector = message.createMessageComponentCollector({
      idle: 120000,
      componentType: ComponentType.Button,
      dispose: true,
    });

    collector.on("collect", (interaktion) => {
      if (!this.filter(interaktion)) {
        interaktion.reply({ ephemeral: true, content: "Request Denied!" });
        return;
      }

      switch (interaktion.customId) {
        case "left":
          this.page--;
          break;
        case "right":
          this.page++;
          break;
        case "page":
          this.goto(interaktion);
          break;
        case "delete":
          interaction.deleteReply().catch(console.log);
          return;
      }
      interaktion.update(this.value).catch(() => undefined);
    });

    // disable components when idle
    collector.on("end", () => {
      message
        .edit({ components: this.components(true) })
        .catch(() => undefined);
    });
  }

  get page() {
    return this.handler.page + 1;
  }
  set page(i: number) {
    this.handler.page = i - 1;
  }
  get length() {
    return this.handler.size;
  }
  get value() {
    return {
      embeds: [this.handler.value],
      components: this.components(),
    };
  }

  components(disabled?: boolean): InteractionReplyOptions["components"] {
    return [
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.Button,
            style: ButtonStyle.Secondary,
            emoji: emoji.left,
            customId: "left",
            disabled: disabled ?? (this.page == 1 || this.length == 1),
          },
          {
            type: ComponentType.Button,
            label: `${this.page} of ${this.length}`,
            style: ButtonStyle.Primary,
            customId: "page",
            emoji: emoji.page,
            disabled: disabled ?? this.length < 3,
          },
          {
            type: ComponentType.Button,
            style: ButtonStyle.Secondary,
            emoji: emoji.right,
            customId: "right",
            disabled:
              disabled ?? (this.length == 1 || this.page == this.length),
          },
          {
            type: ComponentType.Button,
            style: ButtonStyle.Secondary,
            emoji: emoji.delete,
            customId: "delete",
            disabled,
          },
        ],
      },
    ];
  }

  async goto(interaction: MessageComponentInteraction) {
    await interaction.showModal({
      title: `Jump to Page [40seconds]`,
      customId: "goto",
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              label: `Enter page you wanna jump to: [1-${this.length}].`,
              customId: "topage",
              style: TextInputStyle.Short,
              required: true,
              minLength: 1,
              maxLength: this.length.toString().length,
              placeholder: "Index of Page. eg,(1)",
            },
          ],
        },
      ],
    });
    interaction
      .awaitModalSubmit({
        filter: (x) =>
          +x.fields.getTextInputValue("topage") > 0 &&
          +x.fields.getTextInputValue("topage") < this.length + 1,
        time: 40000,
      })
      .then((i) => {
        this.page = +i.fields.getTextInputValue("topage");
        if (i.isFromMessage()) i.update(this.value);
      })
      .catch(() => undefined);
  }
}

interface embedPaginationOptions {
  ephemeral?: boolean;
  filter?: (i: MessageComponentInteraction) => boolean;
}

class EmbedHandler {
  public page = 0;
  public declare size: number;
  private declare embeds: Exclude<InteractionReplyOptions["embeds"], undefined>;
  constructor(embeds: EmbedHandler["embeds"]) {
    this.size = embeds.length;
    this.embeds = embeds;
  }
  get value() {
    return this.embeds[this.page];
  }
}
