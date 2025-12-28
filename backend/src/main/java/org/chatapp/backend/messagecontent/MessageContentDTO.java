package org.chatapp.backend.messagecontent;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class MessageContentDTO {

  private UUID id;
  private String content;
  private LocalDateTime dateSent;
  private MessageType messageType;
  private UUID messageRoomId;
  private String sender;

}
